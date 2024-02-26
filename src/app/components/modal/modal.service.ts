import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // private modalSubject = new Subject<any>();
  // modalState$ = this.modalSubject.asObservable();
  // open(data: any): void {
  //   this.modalSubject.next(data);
  // }
  // close(): void {
  //   this.modalSubject.next(null);
  // }
  // Create a reference to our modal component
  // private rootViewContainer!: any;
  // constructor(private factoryResolver: ComponentFactoryResolver) {
  //   this.factoryResolver = factoryResolver;
  // }
  // setRootViewContainerRef(viewContainerRef: ViewContainerRef | undefined) {
  //   this.rootViewContainer = viewContainerRef;
  // }
  // addDynamicComponent(modalTitle: string, modalText: string) {
  //   const factory =
  //     this.factoryResolver.resolveComponentFactory(ModalComponent);
  //   const component = factory.create(this.rootViewContainer.parentInjector);
  //   component.instance.modalTitle = modalTitle;
  //   component.instance.modalText = modalText;
  //   // Subscribe to the closeModal event and destroy the component
  //   component.instance.closeModal.subscribe(() =>
  //     this.removeDynamicComponent(component)
  //   );
  //   if (this.rootViewContainer)
  //     this.rootViewContainer.insert(component.hostView);
  // }
  // removeDynamicComponent(component: ComponentRef<ModalComponent>) {
  //   component.destroy();
  // }
}
